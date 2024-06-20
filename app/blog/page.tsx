import { CardPost, PostSideBar } from "@/components";

export default function Blog() {
  return (
    <div className="flex justify-center mx-auto w-full my-10 max-[920px]:flex-col">
      <div className="w-7/12 h-full mr-6 max-[920px]:w-11/12 max-[920px]:mx-auto max-[920px]:mr-none">
        <main>
          <CardPost />
        </main>
      </div>

      <PostSideBar />

    </div>
  )
}
