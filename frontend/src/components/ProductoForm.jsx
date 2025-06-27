import { useState } from "react";

export default function ProductoForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    proveedor: "",
    stock: "",
    precio: "",
    ventas: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ventasArray = formData.ventas
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    const data = {
      ...formData,
      stock: Number(formData.stock),
      precio: Number(formData.precio),
      ventas: ventasArray
    };

    try {
      const res = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert("✅ Producto creado: " + result.mensaje);
      setFormData({
        nombre: "",
        categoria: "",
        proveedor: "",
        stock: "",
        precio: "",
        ventas: ""
      });
    } catch (err) {
      alert("❌ Error al crear el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear nuevo producto</h2>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} />
      <input name="proveedor" placeholder="Proveedor" value={formData.proveedor} onChange={handleChange} />
      <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} />
      <input name="precio" placeholder="Precio" type="number" value={formData.precio} onChange={handleChange} />
      <input name="ventas" placeholder="Ventas mensuales (ej: 100,120,90)" value={formData.ventas} onChange={handleChange} />
      <button type="submit">Guardar producto</button>
    </form>
  );
}
