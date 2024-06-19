import { Card } from "@/components/ui/card";
import StoreSwitcher from "./StoreSwitcher";
import { MainNav } from "@/components/MainNav";


export default function Navbar() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={[]} />
                <MainNav className="mx-6" />
            </div>
        </div>
    )
}