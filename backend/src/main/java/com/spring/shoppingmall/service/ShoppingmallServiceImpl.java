package com.spring.shoppingmall.service;

import com.spring.shoppingmall.repository.ShoppingmallMapper;
import com.spring.shoppingmall.vo.ProductGroupInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingmallServiceImpl implements ShoppingmallService {

    @Autowired
    private ShoppingmallMapper shoppingmallDao;

    @Override
    public List<ProductGroupInfoVO> getListExhibition(){
        return shoppingmallDao.getListExhibition();
    }
}
