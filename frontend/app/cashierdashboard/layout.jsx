export default function Layout({children}){

    return(
        <main className="max-w-[1380px] overflow-hidden flex mx-auto">
            <aside className="flex-[20%] grid grid-cols-1 bg-[#25343F] text-white">
                <h1>Hello Im Aside</h1>

            </aside>

            <section className="flex-[80%] w-full overflow-hidden ">
                    <div>{children}</div>

            </section>

        </main>
    )
}