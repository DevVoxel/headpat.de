import Link from "next/link";
import { getUsers } from "utils/actions/user-actions";
import { UserDataDocumentsType } from "utils/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";

export const runtime = "edge";

export default async function Users() {
  const users: UserDataDocumentsType[] = await getUsers();

  return (
    <>
      <h1
        className={
          "max-w-7xl mx-auto text-center mt-8 text-5xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent"
        }
      >
        Find other people
      </h1>
      <Separator
        className={
          "mt-4 max-w-7xl mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        }
      />
      <div className="mb-8 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="sm:flex sm:items-center max-w-7xl mx-auto pb-8">
          <div className="sm:flex-auto">
            <h1 className="mt-4 text-base font-semibold leading-6">Users</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Hier könnt ihr alle User sehen, die sich auf der Seite registriert
              haben.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button>
              <Link href={`/register`}>Eigenen Account erstellen</Link>
            </Button>
          </div>
        </div>
        <Table className={"max-w-7xl mx-auto"}>
          <TableCaption>Made with &lt;3 for furries by furries!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Pronouns</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.$id}>
                <TableCell>{user.displayName || "Keine Angabe"}</TableCell>
                <TableCell>{user.pronouns || "Keine Angabe"}</TableCell>
                <TableCell>{user.status || "Keine Angabe"}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/user/${user.profileUrl || "#"}`}>
                    <Button variant={"outline"}>Zum Profil</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
