type Props = {
  data: string[];
};

function List({ data }: Props) {
  return (
  <ul className="list-group">
    {data.map(elemento => (
    <li onClick={() => console.log(elemento)} key={elemento} className="list-group-item">{elemento}</li>
    ))}
</ul>
  );
}

export default List;