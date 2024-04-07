import React from 'react'

export default function FAQ() {
  return (
 <>
 <div className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
		<h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
		<div className="space-y-4">
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How does Mentor Hub match mentors with mentees?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Mentor Hub uses advanced algorithms and user-provided preferences to match mentees with mentors who have the relevant expertise and experience in their desired field. Our goal is to ensure a tailored and effective mentorship experience for all users.</p>
			</details>
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What is the commitment level expected from mentors and mentees?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Mentor Hub encourages mentors and mentees to define their own commitment levels based on their availability and goals. Some mentorship relationships may involve regular meetings and ongoing support, while others may be more flexible and project-based. Ultimately, the level of commitment is agreed upon mutually by the mentor and mentee. </p>
			</details>
			<details className="w-full border rounded-lg">
				<summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I become a mentor or mentee on Mentor Hub?</summary>
				<p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Becoming a mentor or mentee on Mentor Hub is easy! Simply sign up for an account, complete your profile with relevant information about your expertise and goals, and browse through our database of mentors or mentees. From there, you can send connection requests and start engaging with potential matches.</p>
			</details>
		</div>
	</div>
</div>
 </>
  )
}