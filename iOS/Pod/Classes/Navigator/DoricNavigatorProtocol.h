//
// Created by pengfei.zhou on 2019/11/23.
//

#import <Foundation/Foundation.h>

@protocol DoricNavigatorProtocol <NSObject>
- (void)push:(NSString *)scheme alias:(NSString *)alias;

- (void)pop;
@end