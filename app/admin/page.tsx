import { redirect } from "next/navigation";

export default function ProductPage() {
  return redirect("/admin/orders");
}
