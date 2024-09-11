"use client" 
export default function Page({ connected } ) {
    console.log('For the connected the connected is', connected);

    return (
        <div>
            <h1>Connected to the database: {connected}</h1>
        </div>
    )
}