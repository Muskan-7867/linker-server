
import linkModel from "../models/linktree.model.js"
import createHttpError from "http-errors";

const FRONTEND_URL =   "http://localhost:5173";
const BACKEND_URL =  "http://localhost:8083";
// ✅ Create a new Linktree
export const createLinktree = async (req, res, next) => {
  

  try {
    const { treeName, links } = req.body;
    console.log("from body --13",req.body);

    // if (!treeName || !Array.isArray(links) || links.length === 0) {
    //   return next(createHttpError(400, "Tree name and at least one link are required."));
    // }

    // for (const link of links) {
    //   if (!link.title || !link.icon || !link.url) {
    //     return next(createHttpError(400, "Each link must have a title, icon, and URL."));
    //   }
    // }

    const newLinktree = new linkModel({ treeName, links });
    console.log("newLinktree", newLinktree);
    await newLinktree.save();

    const linktreeId = newLinktree._id;
    const linktreeUrl = `http://localhost:5173/linktree/${linktreeId}`;
    res.status(201).json({ message: "Linktree created successfully", link: newLinktree, url: linktreeUrl });
  } catch (error) {
    console.error("Error creating Linktree:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// ✅ Edit an existing Linktree
export const editLinktree = async (req, res, next)=> {
  try {
    const { id, treeName, links } = req.body;
    if (!id || !treeName || !Array.isArray(links)) {
      return next(createHttpError(400, "'id', 'treeName', and 'links' fields are required"));
    }

    links.forEach((link) => {
      if (!link.icon) {
        link.icon = "defaultIcon.svg";
      }
    });

    const updatedLinktree = await linkModel.findByIdAndUpdate(id, { treeName, links }, { new: true, runValidators: true });

    if (!updatedLinktree) {
      throw createHttpError(404, "Linktree not found.");
    }

    res.status(200).json({ message: "Linktree updated successfully.", linktree: updatedLinktree });
  } catch (error) {
    console.error("Error updating Linktree:", error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

// ✅ Delete a Linktree
export const deleteLinktree = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createHttpError(400, "id is required"));
    }

    const deletedLinktree = await linkModel.findByIdAndDelete(id);
    if (!deletedLinktree) {
      return next(createHttpError(404, "Linktree not found."));
    }

    res.status(200).json({ message: "Linktree deleted successfully.", linktree: deletedLinktree });
  } catch (error) {
    console.error("Error in deleteLinktree:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// ✅ Get a specific Linktree by ID
export const getLinktree = async (req, res, next) => {
  try {
    const { treeId } = req.params;
console.log("treeId", treeId);
    const linktree = await linkModel.findById(treeId);
    if (!linktree) {
      return next(createHttpError(404, "Linktree not found"));
    }

    const linktreeUrl = `http://localhost:5173/linktree/${treeId}`;
    if(!linktreeUrl) {
      return next(createHttpError(404, "Linktree URL not found"));
    }
    res.status(200).json({ message: "Linktree fetched successfully", linktree, url: linktreeUrl });
  } catch (error) {
    console.error("Error fetching Linktree:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// ✅ Save or Update Linktree (NEW API)
export const saveLinktree = async (req, res, next) => {
  try {
    const { treeId, treeName, links, url } = req.body;

    if (!treeId || !treeName || !Array.isArray(links)) {
      return next(createHttpError(400, "Tree ID, treeName, and links are required."));
    }

    let linktree = await linkModel.findById(treeId);

    if (linktree) {
      // Update existing Linktree
      linktree.treeName = treeName;
      linktree.links = links;
      await linktree.save();
      res.status(200).json({ message: "✅ Linktree updated successfully!", linktree });
    } else {
      // Create new Linktree
      linktree = new linkModel({ _id: treeId, treeName, links, url });
      await linktree.save();
      res.status(201).json({ message: "✅ Linktree saved successfully!", linktree });
    }
  } catch (error) {
    console.error("Error saving Linktree:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};
