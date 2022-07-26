export default function ({ store, redirect, next }) {
 if(!store.state.isLoggedIn) {
   return redirect('/login')
 }
}
