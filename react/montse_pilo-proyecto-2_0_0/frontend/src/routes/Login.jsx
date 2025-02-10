// esta será la pagina primera de registro. La de entrada en la ruta '/' Toda a una página. con su formulario de username y password.
// crear el componente para el Login con dos inputs: username y password
import { Form, useHistory } from "react-router-dom";
import { useState } from "react";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

return (
        <div>
            <h1>Proyecto React MonzziDev</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="username">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} value={username} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </Form.Group>
            </Form>
            <button type="submit" disabled={loading}>Iniciar Sesión</button>
            {error && <p>{message}</p>}
        </div>
    );
};
};

export default Login;
