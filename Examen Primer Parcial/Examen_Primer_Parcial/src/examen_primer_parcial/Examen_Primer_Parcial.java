/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package examen_primer_parcial;

import java.util.Scanner;

/**
 *
 * @author Alumno
 */
public class Examen_Primer_Parcial {

    /**
     * @param args the command line arguments
     */
    
      public static double obtenerNumero(Scanner sc, String mensaje) {
        double valor;
        while (true) {
            System.out.print(mensaje);
            if (sc.hasNextDouble()) {
                valor = sc.nextDouble();
                if (valor > 0) {
                    return valor;
                } else {
                    System.out.println("El valor debe ser mayor a 0.");
                }
            } else {
                System.out.println("Entrada inválida.");
                sc.next();
            }
        }
    }

    public static int obtenerOpcionMaterial(Scanner sc) {
        int opcion;
        while (true) {
            System.out.println("\nSeleccione el tipo de piso:");
            System.out.println("1. Porcelanato ($13.45/m²)");
            System.out.println("2. Marmolado ($43.95/m²)");
            System.out.println("3. Acrílico ($39.24/m²)");
            System.out.print("Opción: ");

            if (sc.hasNextInt()) {
                opcion = sc.nextInt();
                if (opcion >= 1 && opcion <= 3) {
                    return opcion;
                } else {
                    System.out.println("Opción inválida.");
                }
            } else {
                System.out.println("Entrada inválida.");
                sc.next();
            }
        }
    }

    // ✅ VALIDACIÓN DEL NOMBRE
    public static String obtenerNombre(Scanner sc) {
        String nombre;

        while (true) {
            System.out.print("Ingrese su nombre completo: ");
            nombre = sc.nextLine().trim();

            if (nombre.isEmpty()) {
                System.out.println("El nombre no puede estar vacío.");
            } else if (nombre.length() > 50) {
                System.out.println("Máximo 50 caracteres.");
            } else if (!nombre.matches("[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+")) {
                System.out.println("Solo se permiten letras y espacios.");
            } else {
                return nombre;
            }
        }
    }
    
    public static void main(String[] args) {
           // TODO code application logic here
           Scanner sc = new Scanner(System.in);
        int opcionMenu;

        do {
            System.out.println("\n===== CÁLCULO DE PISO =====");
            System.out.println("1. Realizar cotización");
            System.out.println("2. Salir");
            System.out.print("Seleccione una opción: ");

            if (sc.hasNextInt()) {
                opcionMenu = sc.nextInt();
                sc.nextLine();
            } else {
                System.out.println("Opción inválida.");
                sc.next();
                opcionMenu = 0;
                continue;
            }

            if (opcionMenu == 1) {

                boolean repetirCotizacion = true;

                while (repetirCotizacion) {

                    String nombre = obtenerNombre(sc);

                    double ancho = obtenerNumero(sc, "Ingrese el ancho (m): ");
                    double largo = obtenerNumero(sc, "Ingrese el largo (m): ");

                    double area = ancho * largo;

                    int opcionMaterial = obtenerOpcionMaterial(sc);

                    double costoM2 = 0;
                    String material = "";

                    switch (opcionMaterial) {
                        case 1:
                            costoM2 = 13.45;
                            material = "Porcelanato";
                            break;
                        case 2:
                            costoM2 = 43.95;
                            material = "Marmolado";
                            break;
                        case 3:
                            costoM2 = 39.24;
                            material = "Acrílico";
                            break;
                    }

                    double subtotal = area * costoM2;

                    // ✅ SOLO COTIZACIÓN
                    System.out.println("\n===== COTIZACIÓN =====");
                    System.out.println("Cliente: " + nombre);
                    System.out.println("Área: " + String.format("%.2f", area) + " m²");
                    System.out.println("Material: " + material);
                    System.out.println("Subtotal: $" + String.format("%.2f", subtotal));

                    // ✅ OPCIONES DESPUÉS
                    System.out.println("\n¿Qué desea hacer?");
                    System.out.println("1. Realizar compra");
                    System.out.println("2. Nueva cotización");
                    System.out.println("3. Regresar al menú principal");
                    System.out.print("Opción: ");

                    int decision;
                    if (sc.hasNextInt()) {
                        decision = sc.nextInt();
                        sc.nextLine();
                    } else {
                        System.out.println("Entrada inválida.");
                        sc.next();
                        continue;
                    }

                    if (decision == 1) {
                        double descuento = subtotal * 0.0725;
                        double subtotalDesc = subtotal - descuento;
                        double iva = subtotalDesc * 0.16;
                        double total = subtotalDesc + iva;

                        System.out.println("\n===== COMPRA FINAL =====");
                        System.out.println("Descuento (7.25%): -$" + String.format("%.2f", descuento));
                        System.out.println("IVA (16%): +$" + String.format("%.2f", iva));
                        System.out.println("TOTAL A PAGAR: $" + String.format("%.2f", total));

                        repetirCotizacion = false;

                    } else if (decision == 2) {
                        System.out.println("\n--- Nueva cotización ---");

                    } else if (decision == 3) {
                        repetirCotizacion = false;

                    } else {
                        System.out.println("Opción inválida.");
                    }
                }
            }

        } while (opcionMenu != 2);

        System.out.println("Programa finalizado.");
        sc.close();
    }
    
    }
    

