'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import getDescriptionHandler from '../actions/server/document/get/description/route'
import readImagesHandler from '../actions/server/document/image/read/route'
import uploadImageHandler from '../actions/server/document/image/upload/route'
import deleteImageHandler from '../actions/server/document/image/delete/route'
import readDocumentHandler from '../actions/server/document/read/route'
import embedTextHandler from '../actions/server/document/text/embed/route'
import Link from 'next/link'
import { protect } from '@/lib/protection'
import LoadingPage from '../loading'

const SearchParamsComponent = () => {
  const searchParams = useSearchParams()
  const documentName = searchParams.get('name')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (documentName) {
      fetchDocumentDetails()
      protect()
    }
  }, [documentName])

  const fetchDocumentDetails = async () => {
    setIsLoading(true)
    try {
      const descriptionData = await getDescriptionHandler(documentName)
      if (descriptionData.error) {
        console.error(descriptionData.error)
      } else {
        setDescription(descriptionData.description)
      }

      const imagesData = await readImagesHandler(documentName)
      if (imagesData.images) {
        setImages(imagesData.images)
      }
    } catch (error) {
      console.error("Error fetching document details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (event) => {
    const embedData = async (urls) => {
      const text = await readDocumentHandler(urls)
      await embedTextHandler(documentName, text)
    }

    const files = event.target.files
    if (files.length === 0) return

    setIsUploading(true)
    const base64Images = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const base64 = await convertToBase64(file)
      base64Images.push(base64)
    }

    try {
      const data = await uploadImageHandler(documentName, base64Images)
      await embedData(data.urls)
      await fetchDocumentDetails() // Refresh images after upload
    } catch (error) {
      console.error("Error uploading images:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageDelete = async (url) => {
    setIsDeleting(true)
    try {
      const result = await deleteImageHandler(documentName, url)
      if (result.message === 'Image deleted successfully.') {
        await fetchDocumentDetails() // Refresh images after deletion
      } else {
        console.error("Error deleting image:", result.message)
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{documentName}</h1>
      <p>{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.image}
              alt={`Document Image ${index + 1}`}
              className="object-contain w-full h-auto max-h-[250px]"
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleImageDelete(image.url)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-end gap-2 mt-4">
        <input
          type="file"
          multiple
          className="hidden"
          id="document-images"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
        <label
          htmlFor="document-images"
          className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </label>
        <Link href={{
          pathname: "/document/chat",
          query: {
            name: documentName
          }
        }}>
          <Button variant="outline">
            Chat with Chatbot
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function DocumentViewer() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <Suspense fallback={<LoadingPage />}>
        <SearchParamsComponent />
      </Suspense>
    </div>
  )
}