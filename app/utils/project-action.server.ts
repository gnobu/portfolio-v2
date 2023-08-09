import { NodeOnDiskFile, unstable_parseMultipartFormData } from "@remix-run/node"
import invariant from "tiny-invariant"
import slugify from "slugify"

import { uploadHandler } from "./blog-action.server"
import { Cloudinary } from "./cloudinary.server"

export async function processProjectData(request: Request) {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler)

    const title = formData.get("title")
    const image = formData.get("image")
    const description = formData.get("description")
    const type = formData.get("type")
    const role = formData.get("role")
    const year = formData.get("year")
    const stack = formData.get("stack")
    const link_type = formData.get("link_type")
    const link_url = formData.get("link_url")
    const intent = formData.get("intent")
    const id = formData.get("id")

    const errors = {
        title: title ? null : "Title is required",
        image: image || intent ? null : "Image is required",
        description: description ? null : "Description is required",
        type: type ? null : "Type is required",
        role: role ? null : "Role is required",
        year: year ? null : "Year is required",
        stack: stack ? null : "Stack is required",
        link_type: link_type ? null : "Link Type is required",
        link_url: link_url ? null : "Link Url is required",
    }
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
    if (hasErrors) return { errors }

    invariant(typeof title === "string", "Title must be a string")
    invariant(typeof type === "string", "Type must be a string")
    invariant(typeof description === "string", "Description must be an object")
    invariant(typeof role === "string", "Role must be a string")
    invariant(typeof year === "string", "Year must be a string")
    invariant(typeof stack === "string", "Stack must be a string")
    invariant(typeof link_type === "string", "Link Type must be a string")
    invariant(typeof link_url === "string", "Link Url must be a string")

    let res
    const slug = slugify(title, { strict: true })
    if ((image as Blob).size) {
        invariant(image instanceof NodeOnDiskFile, "Incorrect image format")
        res = await Cloudinary.uploadImage(image.getFilePath(), slug, 'projects')
        if (!res.imageURL) throw new Error('An error occured while uploading the picture')
    }

    return {
        data: {
            title, type, description, role,
            year, stack, image: res?.imageURL ?? null,
            link_type, link_url
        }, intent, id
    }
}