import  dbConnect from "@/server/lib/mongodb";
import Page from "./content";
export default async function Home() {
  const connectDb = async() => {
    await dbConnect();
    return 'true';
  }
  
  let connected = 'false'

  // Connect to the database here
  connected = await connectDb();

  return (
    <Page connected={connected}/>
  )

}
