import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { Post, storageService } from '../../appwrite/storage';
import { authSlice } from '../../store/authSlice';
import { Input } from '../Input';
import { RTE } from '../RTE';
import { Button } from '../Button';

type PostWithFile = Post & { image: FileList };

export function PostForm({ post }: { post?: Post }) {
  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value.trim().toLowerCase().replace(/\W+/g, '-');
    }
    return '';
  }, []);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<PostWithFile>({
      defaultValues: { ...post, slug: slugTransform(post?.title || '') },
    });

  const navigate = useNavigate();
  const userData = useSelector(authSlice.selectors.userData);

  const submit: SubmitHandler<PostWithFile> = async (data) => {
    const { image, ...postData } = data;
    const file = image[0] ? await storageService.uploadFile(image[0]) : null;

    postData.active = Boolean(postData.active);

    if (post) {
      if (file && post.featuredImage) {
        await storageService.deleteFile(post.featuredImage);
      }

      const savedPost = await storageService.updatePost(post.$id!, {
        ...postData,
        featuredImage: file?.$id || post.featuredImage,
      });

      if (savedPost) {
        navigate(`/posts/${savedPost.$id}`);
      }
    } else {
      const savedPost = await storageService.createPost({
        ...postData,
        featuredImage: file?.$id || undefined,
        userId: userData!.$id,
      });

      if (savedPost) {
        navigate(`/posts/${savedPost.$id}`);
      }
    }
  };

  useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title!), { shouldValidate: true });
      }
    });
  }, [setValue, slugTransform, watch]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) =>
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE<PostWithFile>
          name="content"
          control={control}
          label="Content"
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          placeholder="Featured Image"
          type="file"
          accept="image/*"
          className="mb-4"
          {...register('image', { required: !post })}
        />
        {post?.featuredImage && (
          <div className="mb-4 w-full">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Input
          label="Active"
          placeholder="Active"
          type="checkbox"
          defaultChecked={true}
          className="mb-4"
          {...register('active', {})}
        />
        {/*<Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('active', { required: true })}
        />*/}
        <Button
          className="w-full"
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
        >
          {post ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
