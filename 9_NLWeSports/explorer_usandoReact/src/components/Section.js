const Section = props => {
    return (
        <section>
            <div>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>

                <ul className={props.className}>
                    {/* items da lista */}
                    {props.children}
                </ul>
            </div>
        </section>
    )
}

export default Section