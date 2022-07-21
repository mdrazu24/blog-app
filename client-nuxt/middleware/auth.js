export default function (context) {
      const { req } = context;

      console.log(req?.headers?.cookie)

}
