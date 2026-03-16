export default function withLogger(Component) {
  return function WrappedComponent(props) {
    const { isLoading, ...rest } = props;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    console.log("Рендер компонента:", Component.name);
    return <Component {...rest} />;
  };
}
