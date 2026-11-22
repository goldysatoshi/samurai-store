import Header from "@/components/Header";
import { getAuthUser } from "@/lib/auth";

export default async function HeaderWithAuth() {
  const user = await getAuthUser();

  return <Header user={user} />;
}
