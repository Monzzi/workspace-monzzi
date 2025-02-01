function PublicLayout() {
  return (
    <>
      <div id="sidebar">
        <hi>React Router Veridas</hi>
        <nav>
          <ul>
            <li>
              <a href={'/clock'}>Clock</a>
            </li>
            <li>
              <a href={'/people'}>People</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">[AQUÍ SE DEBEN RENDERIZAR LOS HIJOS]</div>
    </>
  );
}

export default PublicLayout;
