import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { uid } from 'uid'
const postsDirectory = path.join(process.cwd(), 'posts')
var posts = [];
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  var contentHtml = processedContent.toString()
  var newcontent = "";
  var ids = []
  var titulos = []
  contentHtml.split("\n").forEach(function (value, index) {
    var id = uid();
    if (value.search("<h3>") == 0) {
      titulos.push(value.replace("<h3>", "").replace("</h3>",""))
      value = value.replace("<h3>", "<h3 id='" + id + "'>")
      
      ids.push(id)
    }
    newcontent += (value + "\n")
    
  });
  contentHtml = newcontent;
  //console.log(newcontent)
  // Combine the data with the id and contentHtml
  //console.log(ids)
  return {
    ids,
    titulos,
    id,
    contentHtml,
    ...matterResult.data
  }
}
