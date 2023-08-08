import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {

  const articles = [
    {
      slug: "My-First-Article",
      title: "My First Article",
      tag: "JavaScript",
      intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
      image: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-1998-1999.jpg",
      length: 1,
      markdown: '## First Section\n\nThis is some explanation. See the code below.\n\n```js\n\nexport function getArticle(id: number) {\n\nreturn articles.find(article => article.id === id) ?? null\n\n}\n\n```\n\n## Conclusion\nIn conclusion, in the immortal words of the great Anon:\n\n>**E be things**!'.trim(),
    },
    {
      slug: "90s-Mixtape-I-Made-Just-For-You",
      title: "90s Mixtape I Made Just For You",
      tag: "Other",
      intro: "This is a mixtape comprising hit songs from the 90s. It will give a sense of nostalgia.",
      image: "https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg",
      length: 2,
      markdown: "## 90s Mixtape\n- I wish (Skee-Lo)\n- This Is How We Do It (Montell Jordan)\n- Everlong (Foo Fighters)\n- Ms. Jackson (Outkast)\n- Interstate Love Song (Stone Temple Pilots)\n- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)\n- Just a Friend (Biz Markie)\n- The Man Who Sold The World (Nirvana)\n- Semi-Charmed Life (Third Eye Blind)\n- Baby One More Time (Britney Spears)\n- Better Man (Pearl Jam)\n- It's All Coming Back to Me Now (Céline Dion)\n- This Kiss (Faith Hill)\n- Fly Away (Lenny Kravits)\n- Scar Tissue (Red Hot Chili Peppers)\n- Santa Monica (Everclear)\n- C'mon N' Ride it (Quad City DJ's)".trim(),
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
  }

  const projects = [
    {
      id: 1,
      title: 'KOTMY',
      image: '/app/assets/images/project-image.png',
      description: 'Lorem ipsum dolor sit amet consectetur. Commodo ac non integer dolor venenatis sem lorem.Pretium sollicitudin nec sodales in augue sed lectus.Volutpat arcu hendrerit',
      type: 'Contract',
      role: 'Front-end developer',
      year: '2023',
      stack: 'React, TypeScript, Redux',
      link_type: 'website',
      link_url: '.',
    },
    {
      id: 2,
      title: 'Project Name',
      image: '/app/assets/images/project-image.png',
      description: 'Lorem ipsum dolor sit amet consectetur. Commodo ac non integerdolor venenatis sem lorem.Pretium sollicitudin nec sodales in augue sed lectus.Volutpat arcu hendrerit',
      type: 'Personal Project',
      role: 'Front-end developer',
      year: '2022',
      stack: 'Remix, TypeScript, Node.js',
      link_type: 'code',
      link_url: '.',
      next: 1
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    })
  }

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


// // cleanup the existing database
// await prisma.user.delete({ where: { email } }).catch(() => {
//   // no worries if it doesn't exist yet
// })

// const hashedPassword = await bcrypt.hash("racheliscool", 10)

// const user = await prisma.user.create({
//   data: {
//     email,
//     password: {
//       create: {
//         hash: hashedPassword,
//       },
//     },
//   },
// })