'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard-card";
import getDocumentsHandler from "../actions/server/user/get/documents/route";
import createDocumentHandler from "@/app/actions/server/document/create/route";
import { NewDocument } from "./new-document-form";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);

  const fetchDocuments = async () => {
    setIsLoading(true);

    // const result = await getDocumentsHandler();
    const result = await getDocumentsHandler();
    
    console.log(result)

    console.log('returned', result);
    if (!result) {
      setError("Failed to fetch documents");
    } else if (result.error) {
      setError(result.error);
    } else if (result.documents) {
      setDocuments(result.documents);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [showNewDocumentForm]);

  const handleCreateDocument = async (name, description) => {
    try{
      const result = await createDocumentHandler(name, description);

      if (result.message === 'New document created successfully.') {
        setShowNewDocumentForm(false);
        fetchDocuments(); // Refresh the documents list
      } else {
        setError(result.message);
      }
    }
    catch(err){
      setShowNewDocumentForm(false);
      fetchDocuments();
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex flex-col gap-8 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Documents</h1>
          <Button onClick={() => setShowNewDocumentForm(true)}>Add New Document</Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {showNewDocumentForm && (
          <NewDocument 
            setShowNewDocumentForm={setShowNewDocumentForm}
            onCreateDocument={handleCreateDocument}
          />
        )}
        {documents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, index) => (
              <DashboardCard
                key={index}
                name={doc.name}
                fetchDocuments={fetchDocuments}
                description={doc.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl mb-4">You don't have any documents yet.</p>
            <p className="text-gray-600">Click the "Add New Document" button to create your first document!</p>
          </div>
        )}
      </main>
    </div>
  );
}