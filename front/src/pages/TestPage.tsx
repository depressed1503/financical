import { Button } from "@/components/ui/button";
import Axios from "@/lib/axiosConfig";

export default function TestPage() {
    return (
        <Button onClick={() => Axios.get("api/cookie/")}></Button>
    )
}