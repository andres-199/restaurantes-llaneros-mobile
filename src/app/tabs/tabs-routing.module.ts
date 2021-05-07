import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('../purchases/purchases.module').then(
            (r) => r.PurchasesPageModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'time',
        loadChildren: () =>
          import('../time/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
