import { type ChangeEvent, useEffect, useState } from "react"

interface Props {
    label: string
    required?: boolean
    value?: string
    name?: string
    className?: string
    accept?: string
}

export default function Upload({
    required,
    label,
    name,
    value,
    className,
    accept = ".jpg, .jpeg, .png, .gif"
}: Props) {
    const [file, setFile] = useState<string | undefined>(value)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setFile(value)
    }, [value])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files

        if (files && files.length > 0) {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("file", files[0])

            fetch("/admin/api/upload", {
                method: "POST",
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    setFile(res.url)
                    setIsLoading(false)
                })
                .catch((err) => {
                    setIsLoading(false)
                    console.log(err)
                })
        }
    }

    return (
        <div className={`form-control w-full ${className}`}>
            <label htmlFor="" className="label">
                <span className="label-text text-base-content">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
            </label>
            <input
                type="file"
                className="file-input w-full max-w-xs"
                accept={accept}
                onChange={onChange}
                disabled={isLoading}
            />
            <input type="hidden" name={name} value={file} readOnly />
            {isLoading && <div className="loading loading-dots loading-lg"></div>}
            {file && <img src={file} alt="" className="mt-2" />}
        </div>
    )
}
