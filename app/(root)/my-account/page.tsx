import Link from "next/link"

const AccountPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Account Center</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/my-account/profile" className="block border rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-medium mb-2">Profile</h2>
          <p className="text-sm text-gray-600">View and update your personal information</p>
        </Link>

          <Link href="/my-account/addresses" className="block border rounded-xl p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-medium mb-2">Addresses</h2>
            <p className="text-sm text-gray-600">Manage your shipping and billing addresses</p>
          </Link>
      </div>
    </div>
  )
}

export default AccountPage
