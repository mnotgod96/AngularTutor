import { Component, OnInit } from '@angular/core';
import { CookedFood } from '../../shared/CookedFood.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  isCooking = false;
  isAdding = false;
  isClearing = false;
  noSuchFood = false;
  foodName: string;
  resultName: string;
  foods = new Set([]);
  results: CookedFood[] = [new CookedFood(['西红柿', '鸡蛋'], '西红柿炒鸡蛋'),
                           new CookedFood(['辣椒', '鸡肉'], '辣子鸡'),
                           new CookedFood(['土豆', '牛肉'], '土豆烧牛肉')];

  addFood() {
    this.foods.add(this.foodName);
    this.isAdding = true;
    this.isClearing = false;
    this.isCooking = false;
    this.noSuchFood = false;
  }

  clearFood() {
    this.foods = new Set([]);
    this.isClearing = true;
    this.isAdding = false;
    this.isCooking = false;
    this.noSuchFood = false;
  }

  cookFood() {
    var current_food = Array.from(this.foods);
    current_food.sort();
    for(var i = 0; i < this.results.length; i++) {
      var raw = this.results[i].raw;
      var cuisine = this.results[i].name;
      raw.sort();
      if(raw.length == current_food.length) {
        var isSame = true;
        for(var j = 0; j < raw.length; j++) {
          if(raw[j] != current_food[j]) {
            isSame = false;
            break;
          }
        }
        if(!isSame) {
          continue;
        }
        this.isCooking = true;
        this.isClearing = false;
        this.isAdding = false;
        this.noSuchFood = false;
        this.resultName = cuisine;
        return;
      }
      else {
        continue;
      }
    }
    this.isCooking = false;
    this.isClearing = false;
    this.isAdding = false;
    this.noSuchFood = true;
  }
}
