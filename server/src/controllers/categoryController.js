const Category = require('../models/categoryModel')
const slugify = require('slugify')

//create a category.
exports.addCategory = (req, res) => {
	//create the object that will contain the category data.
	const categoryObject = {
		name: req.body.name,
		slug: slugify(req.body.name),
	}

	//check if there is a file image,
	//if it does extract the image.
	if (req.file) {
		categoryObject.categoryImage =
			process.env.API + '/public/' + req.file.filename
	}

	//logical check to see if there is a parentID,
	//if it does then the item becomes a sub-category.
	if (req.body.parentId) {
		//the item will be a child category.
		categoryObject.parentId = req.body.parentId
	}

	//if not (if the parent id does not exist the item will be the parentID)
	const cat = new Category(categoryObject)

	//save the item.
	cat.save((error, category) => {
		//handle the error.
		if (error) {
			return res.status(400).json({ error })
		}

		//add the category
		if (category) {
			return res.status(201).json({ category })
		}
	})
}

//create the recursive function.
//the arguments wull be tha categories and the parentId
//which will be null initially.
const createCategories = (categories, parentId = null) => {
	//initialise the categoryList with an empty array.
	const categoryList = []
	let category

	//check if the parentId exists.
	if (parentId == null) {
		//if the parentID is null, we will fetch all the parentCategories
		//since they dont have any parentID in them.

		//filter the categories that do not have the parentID
		//cat== all categories
		//cat.parentId==undefined(all cat without parentID)
		category = categories.filter(cat => cat.parentId == undefined)
	} else {
		//bring the categories with parentID in them.
		category = categories.filter(cat => cat.parentId == parentId)
	}

	//useforloops to loop through either item with parent ID or without.
	for (let cate of category) {
		categoryList.push({
			_id: cate._id,
			name: cate.name,
			slug: cate.slug,
			//add the children.
			//this one handles all the children of the parent categories.
			//i.e categories with their children.
			children: createCategories(categories, cate._id),
		})
	}

	//return the category list.
	return categoryList
}
//function to get the categories.
exports.getCategories = (req, res) => {
	//passing an empty object will return all the data.
	Category.find({}).exec((error, categories) => {
		//handle the error.
		if (error) {
			return res.status(400).json({ error })
		}

		//return all the cctegories.
		if (categories) {
			//create a variable to call the recursive function.
			const categoryList = createCategories(categories)
			return res.status(200).json({
				categoryList,
			})
		}
	})
}
