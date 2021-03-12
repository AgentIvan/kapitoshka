import s from './styles.module.css'

const Layout = ({ title, descr, urlBg, colorBg }) => {
    const bgStyle = urlBg
        ? {backgroundImage: `url(${urlBg})`}
        : {backgroundColor: colorBg}
    console.log(urlBg);

    return (
        <section className={s.root} style={bgStyle}>
            {/* {urlBg && <img src={urlBg} alt="Background"/>} */}
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={s.desc}>
                        <p>{descr}</p>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;