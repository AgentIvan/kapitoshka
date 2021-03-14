import s from './styles.module.css'

const Layout = ({ title, colorTitle, urlBg, colorBg, children }) => {
    const bgStyle = urlBg
        ? {backgroundImage: `url(${urlBg})`}
        : {backgroundColor: colorBg}

    console.log(children);

    return (
        <section className={s.root} style={bgStyle}>
            {/* {urlBg && <img src={urlBg} alt="Background"/>} */}
            <div className={s.wrapper}>
                <article>
                    <div className={s.title} style={{ color: colorTitle}}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;