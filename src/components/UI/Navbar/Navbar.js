import React from 'react';

import Perfil from './Perfil/Perfil';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/Logo.png';
import styles from './Navbar.module.css';

const Navigation = (props) => (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home"><img src={logo} alt="oneNet" className={styles.logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Usuários" href="#">
                    <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Instituições" href="#">
                    <NavDropdown.Item href="#action/3.1">Instituições cadastradas</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#">Mural</Nav.Link>
                <NavDropdown title="Relatório de vendas" href="#pricing">
                    <NavDropdown.Item href="#action/3.1">Plano de Saúde</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Cartões">
                    <NavDropdown.Item href="#action/3.1">Recargas</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="MarketPlace">
                    <NavDropdown.Item href="#action/3.1">Boletos</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link href="#deets"><Perfil name={props.institutionName}/></Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigation;
