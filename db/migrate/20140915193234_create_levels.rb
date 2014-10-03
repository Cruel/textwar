class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.string :name
      t.string :slug
      t.string :filename

      t.timestamps
    end
    add_index :levels, :slug, unique: true
  end
end
