
export default function ErrorInfo({children} : {children: React.ReactNode}) {
    return(
        <p className="text-center bg-red-600 my-4 text-sm uppercase p-3 text-white font-bold ">{children}</p>
    )
}