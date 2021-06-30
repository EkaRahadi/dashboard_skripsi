export default function Container({ children }) {
    return (
        <div className="mx-auto mt-20">
            <div className="max-w-sm w-96">{children}</div>
        </div>
    );
}
