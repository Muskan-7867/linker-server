import mongoose from "mongoose";

// Link schema
const linkTreeSchema = new mongoose.Schema({
    treeName: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            required: false,
        },
        public_url: {
            type: String,
            required: false,
        },
    },
    links: [
        {
            icon: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
});

// Create model
const linkTreeModel = mongoose.model("LinkTree", linkTreeSchema);

// Export model
export default linkTreeModel;
