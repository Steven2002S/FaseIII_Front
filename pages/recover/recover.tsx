/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState, useEffect, useReducer } from "react";
import { Layout } from "../../components/layouts/Layout";
import { useForm } from "../../hooks/useForm";
import { GetServerSideProps } from "next";
import axios from "axios";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// import { signIn, getSession, getProviders } from "next-auth/react";
const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const baseUrl = "http://10.3.1.203:3000/api/v2";
import { AuthContext, AuthState, authReducer } from "@/context/auth";
import Image from "next/image";
interface FormValues {
  email: string;
}
function RecoverPage() {
  const router = useRouter();
  const { user, loginUser, isLoggedIn } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true); // Inicialmente, establezca loading en true

  const { handleChange, formulario } = useForm<FormValues>({
    email: "",
  });

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!formulario.email) {
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      return;
    }
  
    try {
      const response = await axios.post(
        `${baseUrl}/email/recover-password-web`,
        {
          email: formulario.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Verifica el código de estado de la respuesta HTTP
      if (response.status === 200) {
        // Si el código es 200, el correo se envió con éxito
        console.log('Correo enviado');
        console.log(response.status);
        Swal.fire({
          title: "Correo enviado",
          text: "Muy pronto un supervisor se pondrá en contacto contigo para restablecer tu contraseña.",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 4000,
          timerProgressBar: true,
          toast: true,
          position: "center",
          showConfirmButton: false,
        });
      } else if (response.status === 403) {
        // Si el código es 403, significa que el usuario no es un administrador
        console.log('Usario no administrador');
        console.log(response.status);
        Swal.fire({
          title: "Error",
          text: "Solo los usuarios administradores pueden modificar contraseñas",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 4000,
          timerProgressBar: true,
          toast: true,
          position: "center",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      // Si ocurre un error en la solicitud, muestra un mensaje de error genérico
      Swal.fire({
        title: "Error",
        text: "El correo electrónico no se encuentra registrado o no es un correo de administrador.",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 4500,
        timerProgressBar: true,
        toast: true,
        position: "center",
        showConfirmButton: false,
      });
      console.log(error);
    }
  };

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  return (
    <>
      <br />
      <Layout title="Auth">
        <div className="flex flex-col lg:flex-row">
          {/* Div para información sobre la página en la parte izquierda */}
          <div className="lg:w-1/2 pr-2 mb-5 lg:mb-0">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-slate-700 p-0 text-center text-green-700 mt-12">
                <br />
                Bienvenidos a la página de Reportes
              </h2>
            </div>
            <div className="text-justify mt-5 ml-5">
              <p className="text-lg text-gray-800 dark:text-gray-400">
                ¡Bienvenido a Schoolar Security - Reportes!
              </p>
              <p className="mt-3 text-md text-gray-700 dark:text-gray-400">
                Nuestro sistema de inicio de sesión te permite acceder a los
                reportes de incidentes de las Unidades Educativas. Para
                continuar, por favor, ingresa tu correo electrónico de
                administrador registrado. Esto te permitirá
                acceder a las funciones de gestión de incidentes.
              </p>
              <p className="mt-3 text-md text-gray-700 dark:text-gray-400">
                En caso que no dispongas de un correo electrónico de
                administrador o si perteneces a una de las unidades educativas y
                necesitas acceso, por favor, comunícate con nosotros a través
                del siguiente correo electrónico de contacto:{" "}
                <a
                  className="text-green-300 dark:text-blue-400"
                  href="mailto:lacastillo12@espe.edu.ec"
                >
                  lacastillo12@espe.edu.ec
                </a>
                . Solicitando una cuenta de administrador con su respectiva justificación.
                Estaremos encantados de ayudarte a obtener acceso a los
                reportes obtenidos sobre los incidentes.
              </p>
            </div>
            <br />
            <div className="flex justify-center ">
              <div className="bg-gray-200 rounded-lg p-6 shadow-md h-32 flex justify-center items-center text-center ml-5">
                <img
                  src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695635408/LuisCastillo_hg2kj1.png"
                  alt="Imagen del ingeniero"
                  className="w-19 h-20 rounded-full mr-3"
                />
                <div className="text-left text-black mt-5">
                  <div>
                    <p className="text-lg font-semibold">Ing. Luis Castillo</p>
                  </div>
                  <div>
                    <p className="mt-1 text-sm">0987800194</p>
                  </div>
                  <div>
                    <p className="mt-1 text-sm font-semibold text-black-700">
                      DIRECTOR DE PROYECTO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de inicio de sesión a la derecha */}
          <div className="lg:w-1/2 pl-4 mr-4">
            <AuthLayout title="Ingresar">
              {/* Contenido del formulario */}
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-slate-700 p-0">
                Restablecer tu contraseña
              </h2>
              <div className="mt-0">
                <div className="mt-1">
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="bblock mb-2 text-xs font-medium text-gray-900 dark:text-gray-900"
                      >
                        ¿Olvidaste tu contraseña? Por favor, introduce tu
                        dirección de correo electrónico. Muy pronto un
                        supervisor se pondrá en contacto contigo para
                        restablecer tu contraseña.
                      </label>
                      <div className="mt-1">
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="Tu correo electrónico"
                          onChange={handleChange}
                          value={formulario.email}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-color-primario hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white shadow"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </AuthLayout>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default RecoverPage;
