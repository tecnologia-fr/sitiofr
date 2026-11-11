                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Ej: Falabella"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ej: juan.rodriguez@falabella.com"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Motive Field */}
                  <div>
                    <label
                      htmlFor="motive"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Motivo del contacto
                    </label>
                    <select
                      id="motive"
                      name="motive"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Consulta sobre Productos/Servicios">
                        Consulta sobre Productos/Servicios
                      </option>
                      <option value="Consulta sobre Producto/Servicio Contratado">
                        Consulta sobre Producto/Servicio Contratado
                      </option>
                      <option
                        value="Solicitud de Cotización
"
                      >
                        Solicitud de Cotización
                      </option>
                      <option value="Solicitud sobre Producto/Servicio Contratado">
                        Solicitud sobre Producto/Servicio Contratado
                      </option>
                      <option value="Reclamo">Reclamo</option>
                      <option value="Felicitaciones">Felicitaciones</option>
                    </select>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-primarui font-bold mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+569 1234 5678"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Escribe tu mensaje..."
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      showArrow={true}
                      size="lg"
                      className={`cursor-pointer text-lg bg-destacado text-white p-0 my-2 btn-light  lg:text-base py-6 pl-8 pr-0 rounded-full font-bold hover:text-white  w-fit`}
                    >
                      Enviar Mensaje
                    </Button>
                  </div>
                </ReCaptchaFormWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section to provide space for the floating form */}
      <div className="bg-white pt-32 pb-16 h-[48rem]">
        {/* Additional content can go here */}
      </div>
    </div>
    </ReCaptchaProvider>
  );
}
