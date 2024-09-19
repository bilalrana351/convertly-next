import { Button } from "@/components/ui/button";
import askChatHandler from "../actions/server/document/chat/ask/route";

export default function Component() {
    return <Button onClick = {() => askChatHandler('Pakistan','Capital of Islo')}></Button>
}