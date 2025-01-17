'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna 'email' permitiendo valores nulos temporalmente
    await queryInterface.addColumn('students', 'email', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir temporalmente valores nulos
    });

    // Agregar columna 'active' con valor por defecto 'true'
    await queryInterface.addColumn('students', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    // Actualizar registros existentes para asignar valores únicos a 'email'
    const students = await queryInterface.sequelize.query(
      'SELECT id FROM students',
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const student of students) {
      // Asignar un email único basado en el ID del estudiante
      const uniqueEmail = `user${student.id}@example.com`;
      await queryInterface.sequelize.query(
        `UPDATE students SET email = :email WHERE id = :id`,
        {
          replacements: { email: uniqueEmail, id: student.id },
        }
      );
    }

    // Modificar la columna 'email' para que no permita valores nulos y sea única
    await queryInterface.changeColumn('students', 'email', {
      type: Sequelize.STRING,
      allowNull: false, // No permitir valores nulos
      unique: true,     // Establecer restricción de unicidad
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las columnas 'email' y 'active' en caso de revertir la migración
    await queryInterface.removeColumn('students', 'email');
    await queryInterface.removeColumn('students', 'active');
  }
};
