interface Post {
  id: number,
  date: string,
  slug: string,
  title: {
    rendered: string
  },
  content: {
    rendered: string
  },
  meta: string[],
  tags: string[],
  categories: string[] | number[]
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  
  const postsFetch: Post[] = await fetch('http://gameblog.local/wp-json/wp/v2/posts').then((res) => res.json());

  return postsFetch.map((post: any) => ({
    slug: post.slug,
  }))
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: any) {
  const { slug } = params

  return <div> My Slug {slug}</div>
}