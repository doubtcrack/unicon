import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/redux/actions/product";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories } from "@/constants/site";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ShopCreateProductPage = () => {
  const { seller } = useSelector((state: any) => state.seller);
  const dispatch: any = useDispatch();

  const [images, setImages]: any = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]: any = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags]: any = useState([]);
  const [originalPrice, setOriginalPrice]: any = useState();
  const [discountPrice, setDiscountPrice]: any = useState();
  const [stock, setStock]: any = useState();

  const handleImageChange = (e: any) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages: any) => [...files, ...prevImages]);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image: any) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller?._id);
    dispatch(createProduct(newForm));
  };

  const handleTagKeyPress = (e: any) => {
    if (e.key === " " || e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tag.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: any) => {
    setTags(tags.filter((tag: any) => tag !== tagToRemove));
  };

  const handleRemoveImage = (imageToRemove: any) => {
    setImages(images.filter((image: any) => image !== imageToRemove));
  };

  const handleDragStart = (e: any, index: number) => {
    e.dataTransfer.setData("index", String(index));
  };

  const handleDrop = (e: any, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("index"));

    const updatedImages = [...images];
    const movedImage = updatedImages[sourceIndex];
    updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, movedImage);
    setImages(updatedImages);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[90vh] mt-8">
      <form
        className="grid w-full lg:w-[100vh] items-start gap-6"
        onSubmit={handleSubmit}
        aria-required={true}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4 pt-8 md:p-8">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Enter Product Details
          </legend>

          {/* Inputs Section */}
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Product Name</Label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your product name..."
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Product Description</Label>
            <Textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description here..."
            />
          </div>
          <div className="grid gap-1">
            <Select onValueChange={(e: any) => setCategory(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select your Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Categories &&
                    Categories.map((i: any) => (
                      <SelectItem value={i.title} key={i.id}>
                        {i.title}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Product Tags</Label>
            <Input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleTagKeyPress}
              placeholder="Enter product related tags here..."
            />
            <div className="flex flex-wrap">
              {tags.map((tag: any, index: any) => (
                <Badge
                  variant={"outline"}
                  className="rounded-full min-w-10 max-w-30 bg-purple-300 text-purple-900 px-3 py-1 flex justify-between items-center"
                  key={index}
                >
                  <div>{tag}</div>
                  <X
                    size={15}
                    className="pl-1 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Original Price</Label>
            <Input
              type="text"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter actual price of product"
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Discounted Price</Label>
            <Input
              type="text"
              required
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter price of your choice"
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Product Stock</Label>
            <Input
              type="number"
              name="price"
              value={stock}
              required
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter your product stock..."
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-muted-foreground">
              Upload Product Images
            </Label>
            <Input
              type="file"
              name="productImage"
              multiple
              onChange={handleImageChange}
              className="file:text-muted-foreground file:cursor-pointer file:rounded-md file:bg-primary"
            />
            <div className="w-full flex items-center flex-wrap">
              {images &&
                images.map((i: any, index: any) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                    className="relative cursor-move"
                  >
                    <img
                      src={URL.createObjectURL(i)}
                      key={index}
                      alt="product images"
                      className="h-20 w-20 object-cover m-2 pointer-events-none"
                    />
                    <X
                      size={15}
                      className="pl-1 cursor-pointer"
                      onClick={() => handleRemoveImage(i)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </fieldset>
        <Button value="Update" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default ShopCreateProductPage;
