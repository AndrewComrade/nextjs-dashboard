import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchCustomers, fetchInvoiceById} from "@/app/lib/data";
import Form from "@/app/ui/invoices/edit-form";

interface EditInvoicePageParams {
  params: { id: string }
}

export default async function Page({params}: EditInvoicePageParams) {
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  return (
    <main>
      <Breadcrumbs breadcrumbs={[
        {label: 'Invoices', href: '/dashboard/invoices'},
        {
          label: 'Edit Invoice',
          href: `/dashboard/invoices/${id}/edit`,
          active: true,
        },
      ]}
      />
      <Form customers={customers} invoice={invoice}/>
    </main>
  )
}