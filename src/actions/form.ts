"use server";


class UserNotFoundErr extends Error {}


// export async function PublishForm(id: number) {
//   const user = await currentUser();
//   if (!user) {
//     throw new UserNotFoundErr();
//   }

//   return await prisma.form.update({
//     data: {
//       published: true,
//     },
//     where: {
//       userId: user.id,
//       id,
//     },
//   });
// }

// export async function GetFormContentByUrl(formUrl: string) {
//   return await prisma.form.update({
//     select: {
//       content: true,
//     },
//     data: {
//       visits: {
//         increment: 1,
//       },
//     },
//     where: {
//       shareURL: formUrl,
//     },
//   });
// }

// export async function SubmitForm(formUrl: string, content: string) {
//   return await prisma.form.update({
//     data: {
//       submissions: {
//         increment: 1,
//       },
//       FormSubmissions: {
//         create: {
//           content,
//         },
//       },
//     },
//     where: {
//       shareURL: formUrl,
//       published: true,
//     },
//   });
// }

// export async function GetFormWithSubmissions(id: number) {
//   const user = await currentUser();
//   if (!user) {
//     throw new UserNotFoundErr();
//   }

//   return await prisma.form.findUnique({
//     where: {
//       userId: user.id,
//       id,
//     },
//     include: {
//       FormSubmissions: true,
//     },
//   });
// }
