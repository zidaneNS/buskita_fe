import Image from "next/image"
import Link from "next/link"

type LinkFooterType = {
    src: string,
    alt: string
}

export default function LinkFooterSection() {
    const links: LinkFooterType[] = [
        {
            src: "fb-footer.png",
            alt: "facebook"
        },
        {
            src: "gitlab-footer.png",
            alt: "gitlab"
        },
        {
            src: "github-footer.png",
            alt: "github"
        },
        {
            src: "telegram-footer.png",
            alt: "telegram"
        },
        {
            src: "ig-footer.png",
            alt: "instagram"
        },
        {
            src: "figma-footer.png",
            alt: "figma"
        },
    ]
    return (
        <div className="flex w-full items-center justify-center">
            {links.map((link, i) => (
                <Link key={i} href="#" className="p-0">
                    <Image
                        src={`/assets/${link.src}`}
                        alt={link.alt}
                        width={80}
                        height={80}
                    />
                </Link>
            ))}
        </div>
    )
}