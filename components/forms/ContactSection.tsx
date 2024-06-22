import { ContactMessage, ContactForm } from ".";

export const ContactSection = () => {

  return (
    <div className="bg-white grid grid-cols-1 gap-12 w-10/12 mx-auto border border-slate-100 rounded-lg py-12 px-8 card-shadow md:grid-cols-2 md:w-9/12">
      <ContactMessage />
      <ContactForm />
    </div>
  )
}

export default ContactSection;