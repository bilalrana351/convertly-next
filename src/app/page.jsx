import login from "@/app/actions/server/user/login/route";
import Page from "./content";
import signupHandler from "./actions/server/user/signup/route";
export default async function Handler () {
  return (
      <Page 
      action={signupHandler}/>
    )
  return (<p>Hellos</p>)
}