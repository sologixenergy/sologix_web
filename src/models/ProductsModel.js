const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    system: { type: String, required: true },
    product_image: { type: String, required: true },
    product_description: { type: String, required: true },
    product_details: {
        Roof_area_required: { type: Number, required: true },
        Annual_energy_generation: { type: Number, required: true },
        Cost_to_consumer: { type: Number, required: true },
        Annual_saving: { type: Number, required: true },
        System_life: { type: Number, required: true },
        Payback_period: { type: Number, required: true },
    }
});


const Product = model("Product", ProductSchema);

module.exports = Product;
