import { Button } from "components/ui/button";
import { BookDashedIcon, FileKeyIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-4 border-b">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <div className="space-y-1">
            <Link href={""}>
              <Button variant="ghost" className="w-full justify-start">
                <BookDashedIcon className={"h-4 pr-2"} />
                Public Profile
              </Button>
            </Link>
            <Link href={""}>
              <Button variant="ghost" className="w-full justify-start">
                <FileKeyIcon className={"h-4 pr-2"} />
                Private info
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Community
          </h2>
          <div className="space-y-1">
            <Link href={""}>
              <Button variant="ghost" className="w-full justify-start">
                <BookDashedIcon className={"h-4 pr-2"} />
                Joined communities
              </Button>
            </Link>
            <Link href={""}>
              <Button variant="ghost" className="w-full justify-start">
                <BookDashedIcon className={"h-4 pr-2"} />
                Songs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
