import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {

  const articles = [
    {
      slug: "my-first-article",
      title: "My First Article",
      tag: "JavaScript",
      intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
      image: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-1998-1999.jpg",
      length: 1,
      markdown: `
      ## First Section
      This is some explanation. See the code below.
      \`\`\`js
      export function getArticle(id: number) {
        return articles.find(article => article.id === id) ?? null
      }
      \`\`\`
      ## Conclusion
      In conclusion, in the immortal words of the great Anon:
      >**E be things**!
      `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "90s Mixtape I Made Just For You",
      tag: "Other",
      intro: "This is a mixtape comprising hit songs from the 90s. It will give a sense of nostalgia.",
      image: "https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg",
      length: 2,
      markdown: `
      ## 90s Mixtape
      - I wish (Skee-Lo)
      - This Is How We Do It (Montell Jordan)
      - Everlong (Foo Fighters)
      - Ms. Jackson (Outkast)
      - Interstate Love Song (Stone Temple Pilots)
      - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
      - Just a Friend (Biz Markie)
      - The Man Who Sold The World (Nirvana)
      - Semi-Charmed Life (Third Eye Blind)
      - Baby One More Time (Britney Spears)
      - Better Man (Pearl Jam)
      - It's All Coming Back to Me Now (Céline Dion)
      - This Kiss (Faith Hill)
      - Fly Away (Lenny Kravits)
      - Scar Tissue (Red Hot Chili Peppers)
      - Santa Monica (Everclear)
      - C'mon N' Ride it (Quad City DJ's)
      `.trim(),
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
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