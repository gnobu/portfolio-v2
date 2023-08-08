import {
    NodeOnDiskFile,
    unstable_composeUploadHandlers,
    unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData
} from "@remix-run/node"
import slugify from "slugify"
import invariant from "tiny-invariant"
import { Cloudinary } from "./cloudinary.server"

export const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
        maxPartSize: 5_000_000,
        file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()// parse everything else into memory
)

export async function processArticleData(request: Request) {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler)

    const title = formData.get("title")
    const tag = formData.get("tag")
    const image = formData.get("image")
    const intro = formData.get("intro")
    const markdown = formData.get("markdown")
    const intent = formData.get("intent")
    const former_slug = formData.get("former_slug")

    const errors = {
        title: title ? null : "Title is required",
        tag: tag ? null : "Tag is required",
        image: image || intent ? null : "Image is required",
        intro: intro ? null : "Intro is required",
        markdown: markdown ? null : "Markdown is required",
        slug: undefined,
        length: undefined
    }
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
    if (hasErrors) return { errors }

    invariant(typeof title === "string", "Title must be a string")
    invariant(typeof tag === "string", "Tag must be a string")
    invariant(typeof intro === "string", "Intro must be an object")
    invariant(typeof markdown === "string", "Markdown must be a string")

    const slug = slugify(title, { strict: true })
    const length = Math.ceil((intro + markdown).split(' ').length / 200)
    let res
    if ((image as Blob).size) {
        invariant(image instanceof NodeOnDiskFile, "Incorrect image format")
        res = await Cloudinary.uploadImage(image.getFilePath(), slug, 'blog')
        if (!res.imageURL) throw new Error('An error occured while uploading the picture')
    }


    return {
        data: { title, tag, markdown, length, slug, image: res?.imageURL ?? '', intro },
        intent, slug: former_slug
    }
}